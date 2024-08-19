import styles from '../styles/pricing.module.css';

const Pricing = () => {
  return (
    <div className={styles.pricingContainer}>
    <h1 className={styles.heading}>Our Pricing Plan</h1>
    <div className={styles.plan}>
      <h2 className={styles.planTitle}>Basic Plan</h2>
      <ul className={styles.planDetails}>
        <li>Feature 1: High-quality service</li>
        <li>Feature 2: 24/7 customer support</li>
        <li>Feature 3: Unlimited usage</li>
        <li>Feature 4: Free updates</li>
      </ul>
      <button className={styles.subscribeButton}>Subscribe Now</button>
    </div>
  </div>
  );
}

export default Pricing;
