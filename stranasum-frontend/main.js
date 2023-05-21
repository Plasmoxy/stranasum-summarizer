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

const infer = _.debounce(async (input) => {
  const model = [
    // all models
    document.querySelector("#lyric-snow"),
    document.querySelector("#copper-haze-38"),
    document.querySelector("#rural-star-32"),
  ].filter((c) => c.checked)[0].id
  console.log("Sending to inference for", model, ": ", input)

  prog.style.setProperty("display", "inline-flex")
  ptex.innerHTML =
    "Summarizing ... (please wait up to 15 s for container start)"

  try {
    const inferRes = await fetch(INFERENCE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        text: input,
      }),
    })
    prog.style.setProperty("display", "none")
    ptex.innerHTML = "Summarize"

    const inferResData = await inferRes.json()

    summary.innerHTML = inferResData.summary
    clean.innerHTML = inferResData.clean
  } catch (e) {
    ptex.innerHTML = "Error when calling inference service."
  }
}, 100)

butt.addEventListener("click", (ev) => {
  infer(article.value)
})
