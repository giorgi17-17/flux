import React, { useState } from "react";
import styles from "../../styles/faq.module.css";
import { FaPlus, FaMinus } from "react-icons/fa";

interface Card {
  id: number;
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const cards: Card[] = [
    {
      id: 1,
      question: "როგორ მუშაობს FLUXIT ?",
      answer:
        "ვებსაიტის გამოყენება მარტივია. 1) რეგისტრირდები 2) გასცემ კითხვებს პასუხს რადგან შევძლოთ ვარჯიშები შენზე იყოს მორგებული. 3) იწყებ ვარჯიშს იმავე დღეს",
    },
    {
      id: 2,
      question: "არის ვარჯიშის რუტინები დამწყებთათვის მორგებული?",
      answer: "ჩვენი მთავარი მიზანია დავეხმაოთ იმ ადამიანებს ვინებმაც არ იციან როგორ ივარჯიშონ სწორად",
    },
    {
      id: 3,
      question: "რა მჭირდება ვარჯიშის დასაწყებად",
      answer: "მხოლოდ მობილური და ვარჯიშის სურვილი",
    },
  ];

  const handleCardClick = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>ხშირად დასმული კითხვები</div>
      <div className={styles.questions}>
        {cards.map((card) => (
          <div className={styles.card} key={card.id}>
            <div
              className={`${styles.question} ${
                expandedCard === card.id ? styles.expanded : ""
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className={styles.text}>{card.question}</div>
              <div className={styles.icon}>
                {expandedCard === card.id ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
            {expandedCard === card.id && (
              <div className={styles.answer}>{card.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
