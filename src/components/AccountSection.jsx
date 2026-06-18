import { useId, useState } from "react";
import ScrollReveal from "./ScrollReveal";

function AccountList({ items, onCopy }) {
  return (
    <div className="acct-list">
      {items.map((acc) => (
        <div key={acc.holder} className="acct">
          <div>
            <p className="lab">{acc.holder}</p>
            <p className="num">{acc.number}</p>
            <p className="hd">{acc.bank}</p>
          </div>
          <button type="button" onClick={() => onCopy(acc.number)}>
            복사
          </button>
        </div>
      ))}
    </div>
  );
}

export default function AccountSection({ accounts, onCopy }) {
  const [openSide, setOpenSide] = useState(null);
  const panelId = useId();

  const toggle = (side) => {
    setOpenSide((prev) => (prev === side ? null : side));
  };

  const sides = [
    { key: "groom", data: accounts.groom },
    { key: "bride", data: accounts.bride },
  ];

  const active = openSide ? accounts[openSide] : null;

  return (
    <div className="account-section">
      <ScrollReveal>
        <div className="account-intro">
          <h2 className="account-title">{accounts.title}</h2>
          <p className="account-message">{accounts.message}</p>
        </div>
      </ScrollReveal>

      <div className="acct-tabs">
        {sides.map(({ key, data }) => {
          const isOpen = openSide === key;
          return (
            <button
              key={key}
              type="button"
              className={`acct-tab${isOpen ? " is-open" : ""}`}
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{data.label}</span>
              <span className={`acct-tab-chevron${isOpen ? " is-open" : ""}`}>
                ↓
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        className={`acct-panel${openSide ? " is-open" : ""}`}
        aria-hidden={!openSide}
      >
        <div className="acct-panel-inner">
          {active && (
            <ScrollReveal key={openSide}>
              <AccountList items={active.items} onCopy={onCopy} />
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}
