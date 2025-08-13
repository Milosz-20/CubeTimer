import React, { useRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'noSpacing' | 'compact' | 'medium' | 'large';
  colorBg?: string;
  colorText?: string;
  borderRd?: string;
  animation?: 'shrink' | 'rotate' | 'bounce' | 'error';
  animationTiming?: KeyframeAnimationOptions;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconPosition = 'right',
  size = 'compact',
  colorBg,
  colorText,
  borderRd = '0.5rem',
  animation,
  animationTiming,
  onClick,
  className,
  ...buttonProps
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const animations: Record<string, Keyframe[]> = {
        shrink: [
          { transform: 'scale(1)' },
          { transform: 'scale(0.9)' },
          { transform: 'scale(1)' }
        ],
        rotate: [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(360deg)' }
        ],
        bounce: [
          { transform: 'translateY(0)' },
          { transform: 'translateY(-0.5rem)' },
          { transform: 'translateY(0)' }
        ],
        error: [{ opacity: 1 }, { opacity: 0.8 }, { opacity: 1 }]
      };

      const keyframes = animations[animation!];
      const timing = animationTiming || { duration: 200, easing: 'ease' };

      if (keyframes) {
        buttonRef.current.animate(keyframes, timing);
      }
    }

    if (onClick) onClick(event);
  };

  // If color starts with '--', treat as CSS variable
  const backgroundStyle = colorBg?.startsWith('--')
    ? `var(${colorBg})`
    : colorBg;

  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${styles[size]} ${className || ''}`}
      onClick={handleClick}
      style={{
        borderRadius: borderRd,
        background: backgroundStyle,
        color: colorText
      }}
      {...buttonProps}
    >
      {iconPosition == 'right' && icon && icon}
      {text && <span className={styles.text}>{text}</span>}
      {iconPosition == 'left' && icon && icon}
    </button>
  );
};
