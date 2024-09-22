from flask import render_template, Blueprint, request, jsonify, session, redirect, url_for
from flask import current_app as app

main = Blueprint("main", __name__)

@main.route("/")
def index():
    return render_template("index.html")

@main.route("/welcome")
def welcome():
    if session["is_logged_in"] == True:
        return render_template("welcome.html", email = session["email"])
    else:
        return redirect(url_for("main.index"))

@main.route("/login", methods = ["POST", "GET"])
def login():
    if request.method == "POST":
        email = request.get_json()["email"]
        password = request.get_json()["password"]

        try:
            user = app.auth.sign_in_with_email_and_password(email, password)
            session["is_logged_in"] = True
            session["email"] = email
            session["local_id"] = user["localId"]
            
            return redirect(url_for("main.welcome"))
        except:
            return redirect(url_for("main.index"))
        
@main.route("/signup", methods = ["POST", "GET"])
def signup():
    if request.method == "POST":
        email = request.get_json()["email"]
        password = request.get_json()["password"]
        name = request.get_json()["name"]
        username = request.get_json()["username"]

        try:
            app.auth.create_user_with_email_and_password(email, password)
            user = app.auth.sign_in_with_email_and_password(email, password)
            print(user)
            session["is_logged_in"] = True
            session["email"] = email
            session["local_id"] = user["localId"]
            data = {"name" : name, "username" : username, "email" : email}
            app.db.child("users").child(user["localId"]).set(data)

            return redirect(url_for("main.welcome"))
        except Exception as e:
            print(e)
            return redirect(url_for("main.index"))
        
@main.route("/logout")
def logout():
    session["is_logged_in"] = False

    return redirect(url_for("main.index"))

@main.route("/quiz")
def quiz():
    if session["is_logged_in"]:
        return render_template("quiz.html")
    else:
        return redirect(url_for("main.index"))

def update_user_score(user_id, score):

    current_score = app.db.child("users").child(user_id).child("score").get().val() or 0
    new_score = max(current_score, score)  # Update only if the new score is higher
    app.db.child("users").child(user_id).update({"score": new_score})

@main.route("/update_score", methods=["POST"])
def update_score():
    if session.get("is_logged_in"):
        user_id = session["local_id"]
        print(user_id)
        score = request.json.get("score")
        print(score)
        update_user_score(user_id, score)
        return jsonify({"success": True}), 200
    return jsonify({"error": "User not logged in"}), 401


@main.route("/leaderboard")
def leaderboard():
    try:
        users = app.db.child("users").order_by_child("score").limit_to_last(10).get()
        leaderboard_data = []
        if users.val():
            for user_id, user_data in users.val().items():
                leaderboard_data.append({
                    "username": user_data.get("username", "Unknown"),
                    "score": user_data.get("score", 0)
                })
        leaderboard_data.sort(key=lambda x: x["score"], reverse=True)
        return render_template("leaderboard.html", leaderboard_data=leaderboard_data)
    except Exception as e:
        print(f"Error fetching leaderboard: {e}")
        return render_template("error.html", error="Failed to fetch leaderboard")
    
@main.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")

@main.route("/test")
def test():
    return render_template("test.html")