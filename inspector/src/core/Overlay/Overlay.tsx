import React, { useState, useRef, useLayoutEffect, useEffect, Fragment, type ReactElement, type ReactHTMLElement } from "react";
import "./index.less"

/** 定义key 区分要监视的元素 */
const KEY_IGNOE = 'data-inspector-ignore'
const KEY_DATA = 'data-inspector-option'

function getData(node: any) {
	return node?.__reactProps?.[KEY_DATA] ?? node?.getAttribute?.(KEY_DATA)
}

export default function Overlay() {
	const [position, setPostion] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	})
	const floatsRef = useRef<HTMLDivElement>(null)
	const [linkParams, setLinkParams] = useState<{ file: string, line: string, column: string } | null>()

	const getTargetNode = (e: Event) => {
		const path = e.composedPath() as Element[]
		if (!path) {
			return {
				targetNode: null,
				params: null
			}
		}

		const ignoreIndex = path.findIndex(node => node?.hasAttribute?.(KEY_IGNOE))
		const targetNode = path.slice(ignoreIndex + 1).find((node: Element) => getData(node))
		if (!targetNode) {
			return {
				targetNode: null,
				params: null
			}
		}
		const match = getData(targetNode)?.split('_')
		const [file, line, column] = match ?? []
		return {
			targetNode,
			params: match ? { file, line, column } : null
		}
	}

	const updateLinkPramas = (e: MouseEvent) => {
		const { targetNode, params } = getTargetNode(e)
		if (targetNode) {
			const rect = targetNode.getBoundingClientRect()
			setPostion({
				x: rect.left,
				y: rect.top,
				width: rect.width,
				height: rect.height,
			})
			setLinkParams(params)
		}
	}

	/** 开启鼠标滑动，更新对应元素信息 */
	useEffect(() => {
		window.addEventListener("mousemove", updateLinkPramas)
		window.addEventListener('click', handleClick)
		return () => {
			window.removeEventListener("mousemove", updateLinkPramas)
			window.removeEventListener('click', handleClick)
		}
	}, [])

	useLayoutEffect(() => {
		/** 确保提示一定在可视区域内 */
		let margin = 10
		let x = position.x + (position.width / 2)
		let y = position.y + position.height + 5

		let floatsWidth = floatsRef.current!.clientWidth ?? 0
		let floatsHeight = floatsRef.current!.clientHeight ?? 0
		x = Math.max(margin, x)
		x = Math.min(x, window.innerWidth - floatsWidth - margin)
		if (x < floatsWidth / 2) {
			x = floatsWidth / 2 + margin
		}

		y = Math.max(margin, y)
		y = Math.min(y, window.innerHeight - floatsHeight - margin)

		floatsRef.current!.style.left = `${x}px`
		floatsRef.current!.style.top = `${y}px`
	}, [position])

	const sizeIndicatorStyle = {
		left: `${position.x}px`,
		top: `${position.y}px`,
		width: `${position.width}px`,
		height: `${position.height}px`,
	}

	/** 打开编辑器 */
	const handleClick = (e: Event) => {
		const { targetNode, params } = getTargetNode(e)
		if (!targetNode) return
		e.preventDefault()
		e.stopPropagation()

		const { file, line, column } = params!
		const url = new URL(`/__open-in-editor?file=${encodeURIComponent(`${file}:${line}:${column}`)}`, import.meta.url)
		openEditor(url, file, line, column)
	}

	const openEditor = (baseUrl: URL, file: any, line: any, column: any) => {
		const _url = baseUrl instanceof URL ? baseUrl : `/__open-in-editor?file=${encodeURIComponent(`${file}:${line}:${column}`)}`
		const promise = fetch(_url, { mode: 'no-cors' })
		console.log(_url)
		return promise
	}

	return <div {...{ [KEY_IGNOE]: true }}>
		<div >
			<a
				className="vue-inspector-banner vue-inspector-card"
				href="https://github.com/Triumph-light/unplugin-react-inspector"
				target="_blank"
			>
				<div>vite-plugin-vue-inspector</div>
				<div className="tip">Click on a element › Open IDE › Link to File</div>
			</a>
		</div>
		<>
			<div className="inspector-card" ref={floatsRef}>
				<span>{linkParams?.file}:{linkParams?.line}:{linkParams?.column}</span>
				<span className="tip">Click to go to the file</span>
			</div>
			<div className="inspector-size-indicator" style={sizeIndicatorStyle}></div>
		</>
	</div>
}
