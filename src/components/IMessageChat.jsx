import { motion } from "framer-motion";

export function IMessageChat({ title, subtitle, avatars, children, className = "" }) {
  return (
    <div className={`imessage-chat ${className}`.trim()}>
      <div className="imessage-header">
        {avatars?.length > 0 && (
          <div className="imessage-header-avatars">
            {avatars.map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
        )}
        <div className="imessage-header-text">
          <p className="imessage-header-title">{title}</p>
          {subtitle && <p className="imessage-header-sub">{subtitle}</p>}
        </div>
      </div>
      <div className="imessage-body">{children}</div>
    </div>
  );
}

export function IMessageBubble({
  side = "left",
  avatar,
  avatarAlt = "",
  label,
  text,
  variant,
  delay = 0,
}) {
  const bubbleClass = [
    "imessage-bubble",
    `imessage-bubble--${side}`,
    variant && `imessage-bubble--${variant}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={`imessage-row imessage-row--${side}`}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {avatar && (
        <img src={avatar} alt={avatarAlt} className="imessage-avatar" />
      )}
      <div className={bubbleClass}>
        {label && <span className="imessage-sender">{label}</span>}
        <p>{text}</p>
      </div>
    </motion.div>
  );
}
