let scanHistory = [];

function checkURL() {

    let url = document.getElementById("urlInput").value.trim();
    let result = document.getElementById("result");

    if (url === "") {

        result.innerHTML =
            "⚠️ Please enter a website URL.";

        return;
    }

    let score = 0;
    let reasons = [];

    let lowerURL = url.toLowerCase();


    // HTTPS CHECK

    if (!lowerURL.startsWith("https://")) {

        score += 20;

        reasons.push(
            "Website is not using HTTPS"
        );
    }


    // SUSPICIOUS KEYWORDS

    let suspiciousWords = [
        "login",
        "verify",
        "password",
        "free",
        "gift",
        "update",
        "account",
        "winner"
    ];


    suspiciousWords.forEach(function(word) {

        if (lowerURL.includes(word)) {

            score += 10;

            reasons.push(
                "Suspicious keyword: " + word
            );
        }

    });


    // @ SYMBOL

    if (url.includes("@")) {

        score += 25;

        reasons.push(
            "URL contains @ symbol"
        );
    }


    // LONG URL

    if (url.length > 80) {

        score += 15;

        reasons.push(
            "URL is unusually long"
        );
    }


    // MAXIMUM SCORE

    if (score > 100) {
        score = 100;
    }


    // RISK LEVEL

    let riskLevel;

    if (score >= 60) {

        riskLevel = "🔴 HIGH RISK";

    }
    else if (score >= 30) {

        riskLevel = "🟡 MEDIUM RISK";

    }
    else {

        riskLevel = "🟢 LOW RISK";

    }


    // REASONS

    let reasonText;

    if (reasons.length > 0) {

        reasonText = reasons.join("<br>");

    }
    else {

        reasonText =
            "No obvious phishing patterns detected.";

    }


    // RESULT

    result.innerHTML = `

        <h2>${riskLevel}</h2>

        <div class="score-container">

            <b>Risk Score: ${score}/100</b>

            <div class="score-bar">

                <div
                    class="score-fill"
                    style="width:${score}%">
                </div>

            </div>

        </div>

        <br>

        <b>🔍 Security Analysis</b>

        <p>${reasonText}</p>

    `;


    // ADD TO HISTORY

    scanHistory.unshift({

        url: url,

        score: score,

        risk: riskLevel

    });


    displayHistory();
}


function displayHistory() {

    let historyText =
        document.getElementById("historyText");


    if (scanHistory.length === 0) {

        historyText.innerHTML =
            "No URLs scanned yet.";

        return;
    }


    historyText.innerHTML = "";


    scanHistory.forEach(function(item) {

        let div =
            document.createElement("div");


        div.className =
            "history-item";


        div.innerHTML = `

            <b>${item.risk}</b><br>

            ${item.url}<br>

            Risk Score: ${item.score}/100

        `;


        historyText.appendChild(div);

    });
}