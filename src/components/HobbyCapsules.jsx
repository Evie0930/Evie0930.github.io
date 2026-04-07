import { CAPSULE_PILL_CLASS } from './capsuleStyles.js';

const HOBBY_LABELS = ['运动', '输出', '体验', '学习'];

export function HobbyCapsules({ className = '' }) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-start gap-3 md:gap-4 ${className}`}
      aria-label="爱好维度"
    >
      {HOBBY_LABELS.map((label) => (
        <li key={label}>
          <span className={CAPSULE_PILL_CLASS}>{label}</span>
        </li>
      ))}
    </ul>
  );
}
