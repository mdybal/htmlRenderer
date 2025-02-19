"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface HtmlEditorModalProps {
  isOpen: boolean
  onClose: () => void
  onAppend: (html: string) => void
}

export function HtmlEditorModal({ isOpen, onClose, onAppend }: HtmlEditorModalProps) {
  const [htmlSnippet, setHtmlSnippet] = useState("")

  const handleAppend = () => {
    onAppend(htmlSnippet)
    setHtmlSnippet("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add HTML Snippet</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Enter your HTML snippet here..."
          value={htmlSnippet}
          onChange={(e) => setHtmlSnippet(e.target.value)}
          className="h-[200px] resize-none"
        />
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleAppend}>Append</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

