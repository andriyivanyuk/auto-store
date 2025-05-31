import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Ваше замовлення успішно оформлене! 🎉</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Найближчим часом з вами зв'яжеться наш менеджер для підтвердження
        деталей.
      </p>
      <p style={{ marginTop: "2rem" }}>
        Якщо у вас є запитання — напишіть нам у Viber, Telegram або
        зателефонуйте.
      </p>
      <Link href="/" style={{ display: "inline-block", marginTop: "2.5rem" }}>
        <button
          style={{
            backgroundColor: "#e94560",
            color: "white",
            padding: "0.8rem 1.5rem",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Повернутися на головну
        </button>
      </Link>
    </main>
  );
}
