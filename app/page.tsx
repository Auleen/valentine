"use client"; // This is a client component 👈🏽
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";

const QUESTIONS = [{ question: "What was the name of the place we went on our first date? 💭", answer: "record room" }, { question: "Name your fav triangle 😉", answer: "right angle triangle" }, { question: "What is the best date food? 🥘", answer: "pav bhaji" }, { question: "What do you call a gift for Ritoja? 🎁", answer: "ritofa" }, { question: "Who is the world's funniest bf? 🥰", answer: "auleen" },];

const baseImg = "/pixel-heart-1.png";
const sadImages = [
  "/pixel-heart-sad-3.png",
  "/pixel-heart-sad-1.png",
  "/pixel-heart-sad-2.png",
  "/pixel-heart-sad-4.png",
];

export default function KawaiiValentine() {
  const [stage, setStage] = useState("intro"); // intro | quiz | valentine
  const [currentQ, setCurrentQ] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [heartIndex, setHeartIndex] = useState(0);
  const [cameFromQuiz, setCameFromQuiz] = useState(false);

  const getNoMessage = (count: number) => {
    const cuteWarnings = [
      "Are you suuure? 🥺",
      "Really really sure? 😿",
      "My heart is wobbling… 💔",
      "Wait… think again! 😭",
      "The heart is shaking! 💖",
      "I feel personally attacked 😵‍💫",
      "Are you trying to break me? 😿",
      "NO is a strong word… 😢",
    ];

    if (count <= cuteWarnings.length) return cuteWarnings[count - 1];
    if (count <= 12) return `This is NO #${count}, I remember each one 💀`;
    if (count <= 20) return `Big Boss mujhe hurt ho raha hai 😣💔 ${count} baar`;

    const gaslightLines = [
      "Hmm… that button definitely said YES a second ago 🤨",
      "Interesting… I think your finger slipped 😌",
      "NO? That’s weird. My screen says YES 💕",
      "Are you sure you read the question correctly? 😇",
      "That doesn’t feel like a NO. Try again 🥰",
      "I think the universe wants you to press YES 🌸",
      "Let’s pretend this didn’t happen and click YES 💖",
    ];

    return `NO #${count} ?!?! . ${gaslightLines[count % gaslightLines.length]}`;

  };

  const handleAnswer = () => {
    if (input.toLowerCase().trim() === QUESTIONS[currentQ].answer.toLowerCase()) {
      setError(false);
      setInput("");
      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setCameFromQuiz(true);
        setStage("valentine");
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-300 bg-[url('/bg.png')] font-mono">
      <Card className="w-[360px] rounded-none border-4 border-pink-500 shadow-[8px_8px_0_#ec4899] bg-pink-100">
        <CardContent className="p-6 text-center space-y-6">

          {stage === "intro" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h1 className="text-xl font-bold text-pink-700">
                Hi Rio 🥰 <br></br>Since you like me asking you questions ...
              </h1>
              <p className="text-sm text-gray-700">
                I made a tiny quiz just for you. Happy Quizzing? 😉💖
              </p>
              <Button
                className="bg-pink-500 hover:bg-pink-600 rounded-none border-2 border-black shadow-[3px_3px_0_#000]"
                onClick={() => setStage("quiz")}
              >
                I'M READY 🎀
              </Button>
            </motion.div>
          )}

          {stage === "quiz" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <p className="text-xs text-gray-600">Question {currentQ + 1} / {QUESTIONS.length}</p>
              <h2 className="text-sm font-bold text-pink-700">
                {QUESTIONS[currentQ].question}
              </h2>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border-2 border-black rounded-none p-2 text-center"
                placeholder="type here…"
              />
              {error && <p className="text-xs text-red-500">try again 🥺</p>}
              <Button
                className="bg-pink-500 hover:bg-pink-600 rounded-none border-2 border-black shadow-[3px_3px_0_#000]"
                onClick={handleAnswer}
              >
                SUBMIT 💌
              </Button>
            </motion.div>
          )}

          {stage === "valentine" && !saidYes && (
            <>
              {cameFromQuiz && (
                <p className="text-xs text-pink-700 font-semibold">
                  OMG you got all of them right 🥹 🎉 <br></br> You must be really smart xD. <br></br>One final question 🙋
                </p>
              )}

              <motion.img
                key={heartIndex}
                src={noCount ? sadImages[heartIndex] : baseImg}
                alt="pixel heart"
                className="mx-auto w-40 h-40 image-rendering-pixelated"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />

              <h1 className="text-xl font-bold text-pink-700">
                WILL U BE MY<br />VALENTINE?
              </h1>

              <div className="flex justify-center gap-4 pt-2">
                <Button
                  className={`bg-pink-500 hover:bg-pink-600 rounded-none border-2 border-black shadow-[3px_3px_0_#000] transition-transform ${noCount > 0 ? 'scale-110' : ''}`}
                  onClick={() => {
                    setSaidYes(true);
                    setShowConfetti(true);
                  }}
                >
                  YES ❤
                </Button>

                <motion.div
                  animate={{ x: noCount > 0 ? [0, -12, 12, 0] : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className={`rounded-none border-2 border-black shadow-[3px_3px_0_#000] transition-transform scale-[${Math.max(0.7, 1 - noCount * 0.08)}]`}
                    onClick={() => {
                      setNoCount(noCount + 1);
                      setHeartIndex((heartIndex + 1) % sadImages.length);
                    }}
                  >
                    NO 💔
                  </Button>
                </motion.div>
              </div>

              {noCount > 0 && (
                <p className="text-xs text-gray-700 pt-2">{getNoMessage(noCount)}</p>
              )}
            </>
          )}

          {showConfetti && (
            <Confetti recycle={false} numberOfPieces={300} />
          )}

          {saidYes && (
            <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
              <h1 className="text-2xl font-bold text-pink-700">YAYYYYYYY :3</h1>
              <motion.img
                src="/image.png"
                alt="pixel heart"
                className="mx-auto w-40 h-40 image-rendering-pixelated"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <p className="text-xl font-bold text-pink-600">mujhe toh pata tha 🥰💌👩‍❤️‍💋‍👨</p>
            </motion.div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
