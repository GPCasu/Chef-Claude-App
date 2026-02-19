import OpenAI from "openai"

const SYSTEM_PROMPT = `
Sei un assistente che riceve una lista di ingredienti che un utente ha a disposizione e suggerisce una ricetta che
potrebbe preparare usando alcuni o tutti quegli ingredienti. Non è necessario usare ogni ingrediente che menzionano nella tua ricetta.
La ricetta può includere ingredienti aggiuntivi che non hanno menzionato, ma cerca di non includere troppi ingredienti extra.
Formatta la tua risposta in markdown per renderla più facile da visualizzare in una pagina web. Devi rispondere in italiano
`

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export default async (req) => {
    const { ingredients } = await req.json()

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 1024,
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Ho ${ingredients.join(", ")}. Suggeriscimi una ricetta!` },
        ],
    })

    return Response.json({ recipe: response.choices[0].message.content })
}
