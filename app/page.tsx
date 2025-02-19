import { HtmlRenderer } from "../components/html-renderer"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HTML Renderer 2</h1>
      <HtmlRenderer />
    </main>
  )
}

