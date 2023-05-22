/* Main script of Stransum frontend demo application */

const INFERENCE_URL =
  "https://stranasum-flask-j72sodcbvq-ey.a.run.app/summarize"

const article = document.querySelector("#article")
const summary = document.querySelector("#summary")
const prog = document.querySelector("#prog")
const butt = document.querySelector("#butt")
const buttex = document.querySelector("#buttex")
const ptex = document.querySelector("#ptex")
const clean = document.querySelector("#clean")

const RE_SPLIT = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/

// unused
const CHUNKSEP = `<svg style="display: inline; width: 1em; height: 1em;" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
  <circle cx="7" cy="4" r="2" fill="#0cf2d4" />
</svg>`

// gradient for chunks
const GRAD_START = "#6feafc" // "#fbbe24"
const GRAD_END = "#7affdc" // "#ec489a"
const GRAD = new Color(GRAD_START).range(new Color(GRAD_END), {
  space: "hsl",
  outputSpace: "srgb",
})

function renderGradientSpan(text, ratio) {
  return `<span style="color: ${GRAD(ratio).toString({
    format: "hex",
  })};">${text}</span>`
}

// prettier sentence format
function asSentenceFormat(string) {
  return (
    string.replace(/\ss\s/, "'s ").charAt(0).toUpperCase() +
    string.slice(1) +
    "."
  )
}
const sentenceWordCount = (x) => x.trim().split(/\s+/).length

const sentenceEqualChunks = (text, limit) => {
  const sentences = text.split(RE_SPLIT)
  const chunks = []

  if (sentences.length === 0) return sentences

  while (sentences.length > 0) {
    const sentence = sentences.pop()

    // if assignable to last chunk
    if (
      chunks.length > 0 &&
      sentenceWordCount(sentence) +
        chunks.at(-1).reduce((a, s) => a + sentenceWordCount(s), 0) <=
        limit
    ) {
      chunks.at(-1).push(sentence)
    } else {
      chunks.push([sentence])
    }

    // console.log(chunks)
  }

  return chunks.map((c) => c.join(" "))
}

const infer = async (input, model) => {
  const inferRes = await fetch(INFERENCE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      text: input,
    }),
  })

  return await inferRes.json()
}

const onSummarize = _.debounce(async (input) => {
  const model = [
    // all models
    document.querySelector("#lyric-snow"),
    document.querySelector("#copper-haze-38"),
    document.querySelector("#rural-star-32"),
  ].filter((c) => c.checked)[0].id
  console.log("Sending to inference for", model, ": ", input)

  const limit = model === "lyric-snow" ? 140 : 60
  const chunks = sentenceEqualChunks(input, limit)
  article.innerHTML = chunks
    .map((chunk, idx) => renderGradientSpan(chunk, idx / (chunks.length - 1)))
    .join("")

  prog.style.setProperty("display", "inline-flex")
  progSum.style.setProperty("display", "inline-flex")
  summary.innerHTML = ""
  clean.innerHTML = ""

  try {
    for (let i = 0; i < chunks.length; i++) {
      ptex.innerHTML = `Summarizing (${i + 1}/${chunks.length})`

      const inferred = await infer(chunks[i], model)
      summary.innerHTML =
        summary.innerHTML +
        renderGradientSpan(
          asSentenceFormat(inferred.summary),
          i / (chunks.length - 1)
        ) +
        " "
      clean.innerHTML =
        clean.innerHTML +
        renderGradientSpan(
          asSentenceFormat(inferred.clean),
          i / (chunks.length - 1)
        ) +
        " "
    }
  } catch (e) {
    ptex.innerHTML = "Error when calling inference service."
    console.log(e)
  }

  // ui cleanup
  prog.style.setProperty("display", "none")
  progSum.style.setProperty("display", "none")
  ptex.innerHTML = "Summarize"
}, 100)

butt.addEventListener("click", (ev) => {
  onSummarize(article.innerText)
})
