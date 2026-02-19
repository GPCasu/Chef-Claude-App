import OpenAI from "openai"

const SYSTEM_PROMPT = `
Sei un assistente che riceve una lista di ingredienti che un utente ha a disposizione e suggerisce una ricetta che 
potrebbe preparare usando alcuni o tutti quegli ingredienti. Non è necessario usare ogni ingrediente che menzionano nella tua ricetta. 
La ricetta può includere ingredienti aggiuntivi che non hanno menzionato, ma cerca di non includere troppi ingredienti extra. 
Formatta la tua risposta in markdown per renderla più facile da visualizzare in una pagina web. Devi rispondere in italiano
`

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
})

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 1024,
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
    })
    return response.choices[0].message.content
}
