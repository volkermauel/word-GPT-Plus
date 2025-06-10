import { Ref } from 'vue'

function insertResult(result: Ref<string>, insertType: Ref<string>): void {
  const paragraph = result.value
    .replace(/\n+/g, '\n')
    .replace(/\r+/g, '\n')
    .split('\n')
  switch (insertType.value) {
    case 'replace':
      Word.run(async context => {
        const range = context.document.getSelection()
        range.insertText(paragraph[0], 'Replace')
        for (let i = paragraph.length - 1; i > 0; i--) {
          range.insertParagraph(paragraph[i], 'After')
        }
        await context.sync()
      })
      break
    case 'append':
      Word.run(async context => {
        const range = context.document.getSelection()
        range.insertText(paragraph[0], 'End')
        for (let i = paragraph.length - 1; i > 0; i--) {
          range.insertParagraph(paragraph[i], 'After')
        }
        await context.sync()
      })
      break
    case 'newLine':
      Word.run(async context => {
        const range = context.document.getSelection()
        for (let i = paragraph.length - 1; i >= 0; i--) {
          range.insertParagraph(paragraph[i], 'After')
        }
        await context.sync()
      })
      break
    case 'NoAction':
      break
  }
}

async function enableTrackChanges(): Promise<void> {
  await Word.run(async context => {
    context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll
    await context.sync()
  })
}

interface ParagraphInfo {
  text: string
  font: {
    bold: boolean
    color: string
    name: string
    size: number
    italic: boolean
    underline: Word.UnderlineType | string
    highlightColor: string
  }
}

async function rewriteSelectionParagraphs(
  paragraphs: { reason: string; text: string }[],
  fonts: ParagraphInfo['font'][]
): Promise<void> {
  await Word.run(async context => {
    const range = context.document.getSelection()
    const ps = range.paragraphs
    ps.load('items')
    await context.sync()

    ps.items.forEach((p, idx) => {
      if (idx >= paragraphs.length) {
        return
      }
      const item = paragraphs[idx]
      p.insertComment(item.reason)
      p.insertText(item.text, 'Replace')
      p.font.set(fonts[idx])
    })

    await context.sync()
  })
}

export default {
  insertResult,
  enableTrackChanges,
  rewriteSelectionParagraphs
}
