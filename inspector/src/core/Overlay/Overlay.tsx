import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import "./index.less"

function getData(node: Element) {
	return node.getAttribute("data-inspector-link")
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

	const getTargetNode = (e: MouseEvent) => {
		const path = e.composedPath() as Element[]
		if (!path) {
			return {
				targetNode: null,
				params: null
			}
		}

		const ignoreIndex = -1
		const targetNode = path.slice(ignoreIndex + 1).find((node: Element) => getData(node))
		if (!targetNode) {
			return {
				targetNode: null,
				params: null
			}
		}
		const match = getData(targetNode)?.match('_')
		const [_, file, line, column] = match ?? []
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
		return () => {
			window.removeEventListener("mousemove", updateLinkPramas)
		}
	}, [])

	useLayoutEffect(() => {
		/** 确保提示一定在可视区域内 */
		let margin = 10
		let x = position.x + (position.width / 2)
		let y = position.y + position.height + 5

		let floatsWidth = floatsRef.current!.clientWidth ?? 0
		let floatsHeight = floatsRef.current!.clientHeight ?? 0
		console.log(window.innerWidth, floatsWidth, margin)
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
	return <>
		<div>
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
				<span>{linkParams?.file}{linkParams?.line}{linkParams?.column}</span>
				<span className="tip">Click to go to the file</span>
			</div>
			<div className="inspector-size-indicator" style={sizeIndicatorStyle}></div>
		</>
	</>
}
