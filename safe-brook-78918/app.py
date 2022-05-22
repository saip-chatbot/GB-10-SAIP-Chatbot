from flask import Flask, render_template, request,jsonify
from chat import handle_message
from chat import recommend
from flask_cors import CORS, cross_origin



app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = 'Content-Type'

@app.get("/")
def index_get():
   return render_template("base.html")



@app.post("/predict")
@cross_origin()
def predict():
    text = request.get_json(force=True).get("message")
    response = handle_message(text)
    rec = recommend(response)
    recAnswer = handle_message(rec)
    message = {"answer": response , "recommend": rec, "rAnswer": recAnswer}
    return jsonify(message)


if __name__ == "__main__":
    app.run(debug=True)