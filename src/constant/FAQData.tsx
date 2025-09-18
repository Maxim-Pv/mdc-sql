export type FAQBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: Array<string | { title: string; text: string }> };

export interface FAQItem {
  question: string;
  answer: FAQBlock[];
}

/**
 * Преобразует сырой массив из messages.faq.items в FAQItem[]
 */
export function buildFaqData(raw: any[]): FAQItem[] {
  return raw.map((entry) => {
    const question: string = entry.question;
    const answer: FAQBlock[] = (entry.answer || []).map((block: any) => {
      if (block.type === "paragraph") {
        return { type: "paragraph", text: block.text };
      }
      if (block.type === "list") {
        return { type: "list", items: block.items };
      }
      return { type: "paragraph", text: "" };
    });
    return { question, answer };
  });
}
