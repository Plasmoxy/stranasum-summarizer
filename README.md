<p align="center">
  <picture>
    <img alt="Hugging Face Transformers Library" src="https://github.com/Plasmoxy/stranasum-summarizer/blob/main/logo.png?raw=true" height="100" style="max-width: 100%;">
  </picture>
  <br/>
  <br/>
</p>

<h3 align="center">
    <p>Stranasum - Abstractive summarization using deep learning</p>
</h3>

Author: Sebastián Petrík

Code repository for the bachelor thesis "Abstractive summarization using deep learning" on FIIT STU, Bratislava.

<p align="center">
  <picture>
    <img alt="Hugging Face Transformers Library" src="https://github.com/Plasmoxy/stranasum-summarizer/blob/main/ezgif-1-79b9a1a64b.gif?raw=true" style="max-width: 60%;">
  </picture>
  <br/>
  <br/>
</p>


The digital part included in the thesis contains the following files:
```
BP_SebastianPetrik
|―― inference-server/
| |―― .gitignore                        <- gitignore file for i.s.
| |―― Dockerfile                        <- inference server Dockerfile
| |―― Dockerfile.cloud                  <- i.s. dockerfile for cloud deployment
| \―― serve.py                          <- inference server code
|―― model-server/
| |―― models/                           <- models directory (place models here)
| | |―― copper-haze-38/                 <- copper-haze-38 artifact directory
| | |―― lyric-snow/                     <- lyric-snow artifact directory
| | \―― rural-star-32/                  <- rural-star-32 artifact directory
| |―― .gitignore                        <- git ignore for model server
| |―― Dockerfile                        <- model server dockerfile
| |―― full-config.example.config        <- example complete TF Serving config
| \―― models.config                     <- TF Serving config for selected models
|―― stranasum-frontend/
| |―― header.png                        <- frontend background image
| |―― index.html                        <- frontend HTML code
| \―― main.js                           <- frontend JS code
|―― .gitignore                          <- global gitignore file
|―― BP_SebastianPetrik.pdf              <- thesis pdf
|―― LICENSE                             <- repository license
|―― README.md                           <- repository README
|―― build-gcloud.sh                     <- google cloud GCR build script
|―― docker-compose.external.yml         <- remote deployment docker compose
|―― docker-compose.yml                  <- docker compose config
|―― experiment2_lstm_sum.ipynb          <- LSTM experiment notebook
|―― stranasum-data-gigaword.ipynb       <- Gigaword data preparation module
|―― stranasum-eval.ipynb                <- Evaluation module
|―― stranasum-model.ipynb               <- Development module
|―― stranasum-preprocessing.ipynb       <- Data preparation module
\―― stranasum-visual.ipynb              <- Visualization module
```
