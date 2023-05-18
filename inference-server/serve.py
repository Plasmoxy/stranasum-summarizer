"""
Final inference server connecting to stranasum tensorflow-serving service
"""

import re

import contractions
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from waitress import serve


def SERVING_URL(model):
    return f"https://stranasum-j72sodcbvq-ey.a.run.app/v1/models/{model}:predict"


class TextProcessor:

    # Text cleanup
    def clean_text(self, text: str):

        # lowercase
        text = str(text).lower()

        # remove &-escaped characters
        text = re.sub(r"&.[1-9]+;", " ", str(text))

        # remove escaped characters
        text = re.sub("(\\t)", ' ', str(text))
        text = re.sub("(\\r)", ' ', str(text))
        text = re.sub("(\\n)", ' ', str(text))

        # remove double characters
        # remove _ if it occurs more than one time consecutively
        text = re.sub("(__+)", ' ', str(text))
        # remove - if it occurs more than one time consecutively
        text = re.sub("(--+)", ' ', str(text))
        # remove ~ if it occurs more than one time consecutively
        text = re.sub("(~~+)", ' ', str(text))
        # remove + if it occurs more than one time consecutively
        text = re.sub("(\+\++)", ' ', str(text))
        # remove . if it occurs more than one time consecutively
        text = re.sub("(\.\.+)", ' ', str(text))

        # special - fix u.s. contraction in gigaword
        text = re.sub("(u\.s\.)", 'united states', str(text))

        # fix contractions to base form
        text = contractions.fix(text)

        # remove special tokens <>()|&©ø"',;?~*!
        text = re.sub(r"[<>()|&©ø\[\]\'\",;?~*!]", ' ', str(text)).lower()

        # CNN mail data cleanup
        text = re.sub("(mailto:)", ' ', str(text))  # remove mailto:
        text = re.sub(r"(\\x9\d)", ' ', str(text))  # remove \x9* in text
        # replace INC nums to INC_NUM
        text = re.sub("([iI][nN][cC]\d+)", 'INC_NUM', str(text))
        text = re.sub("([cC][mM]\d+)|([cC][hH][gG]\d+)", 'CM_NUM',
                      str(text))  # replace CM# and CHG# to CM_NUM

        # url replacement into base form
        try:
            url = re.search(r'((https*:\/*)([^\/\s]+))(.[^\s]+)', str(text))
            repl_url = url.group(3)
            text = re.sub(
                r'((https*:\/*)([^\/\s]+))(.[^\s]+)', repl_url, str(text))
        except:
            pass

        # handle dot at the end of words
        text = re.sub("(\.\s+)", ' ', str(text))  # remove

        # remove - at end of words(not between)
        text = re.sub("(\-\s+)", ' ', str(text))
        # remove : at end of words(not between)
        text = re.sub("(\:\s+)", ' ', str(text))

        # remove multiple spaces
        text = re.sub("(\s+)", ' ', str(text))

        # apply lowercase again
        text = text.lower().strip()

        # remove trailing dot, we will apply end of sequence anyway
        text = re.sub("(\.)$", '', str(text)).strip()

        # gigaword - UNK token
        text = re.sub("unk", '', str(text).strip())

        # gigaword - change numbers to hashtags
        text = re.sub("\d", "#", str(text).strip())

        return text

    def apply_special_tokens(self, text):
        text = str(text).strip()
        text = "<sos> " + str(text).strip() + " <eos>"
        return text

    def remove_special_tokens(self, text):
        text = text.lower()
        text = text.replace("<sos>", "").replace("<eos>", "")
        text = text.strip()
        return text


processor = TextProcessor()
app = Flask(__name__)
CORS(app)


@app.route('/summarize', methods=['POST'])
def summarize():
    request_data = request.get_json()
    text = request_data['text']
    model = request_data['model']

    clean = processor.clean_text(text)
    article = processor.apply_special_tokens(clean)
    print("Inferring:", article)

    res = requests.post(SERVING_URL(model), json={
        "inputs": {
            "sentence": [article]
        }
    })

    out = res.json()['outputs']['output_0']

    summary = processor.remove_special_tokens(out)

    return jsonify({"clean": clean, "summary": summary})


print("Serving Stranasum on 8080...")
serve(app, host="0.0.0.0", port=8080)
