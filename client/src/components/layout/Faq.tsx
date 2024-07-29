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
    { id: 1, question: "How Does FLUXIT Work?", answer: "FLUXIT works by using a sophisticated algorithm to..." },
    { id: 2, question: "Are the workout plans suitable for beginners?", answer: "Our return policy is..." },
    { id: 3, question: "What equipment do I need for the workout plans?", answer: "You can contact support via..." },
  ];

  const handleCardClick = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Frequently Asked Questions</div>
      <div className={styles.questions}>
        {cards.map(card => (
          <div className={styles.card} key={card.id}>
            <div
              className={`${styles.question} ${expandedCard === card.id ? styles.expanded : ""}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className={styles.text}>{card.question}</div>
              <div className={styles.icon}>
                {expandedCard === card.id ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
            {expandedCard === card.id && (
              <div className={styles.answer}>
                {card.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
