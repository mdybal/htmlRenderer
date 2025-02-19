"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, MinusIcon } from "lucide-react"
import { HtmlEditorModal } from "./html-editor-modal"

export function HtmlRenderer() {
  const [htmlInput, setHtmlInput] = useState("")
  const [renderedHtml, setRenderedHtml] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)

  const handleRender = () => {
    setRenderedHtml(htmlInput)
  }

  const handleAppendHtml = (newHtml: string) => {
    const updatedHtml = htmlInput + newHtml
    setHtmlInput(updatedHtml)
    setRenderedHtml(updatedHtml)
  }

  const handleDeleteElement = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDeleteMode) {
      const target = event.target as HTMLElement
      if (target.id !== "rendered-content") {
        target.remove()
        setRenderedHtml(document.getElementById("rendered-content")?.innerHTML || "")
        setHtmlInput(document.getElementById("rendered-content")?.innerHTML || "")
      }
      setIsDeleteMode(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Textarea
          placeholder="Enter your HTML here..."
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          className="h-[calc(100vh-250px)] resize-none"
        />
        <div className="flex space-x-2">
          <Button onClick={handleRender}>Render</Button>
          <Button onClick={() => setIsModalOpen(true)} variant="outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Snippet
          </Button>
          <Button onClick={() => setIsDeleteMode(!isDeleteMode)} variant={isDeleteMode ? "destructive" : "outline"}>
            <MinusIcon className="w-4 h-4 mr-2" />
            {isDeleteMode ? "Cancel Delete" : "Delete Element"}
          </Button>
        </div>
      </div>
      <div className="border rounded-md p-4 h-[calc(100vh-200px)] overflow-auto" onClick={handleDeleteElement}>
        <div id="rendered-content" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      </div>
      <HtmlEditorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAppend={handleAppendHtml} />
    </div>
  )
}

