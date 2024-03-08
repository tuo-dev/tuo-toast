import { useEffect, useRef, useState } from 'react';
import { useTuoToast } from '../../contexts/TuoToastContext';
import './index.scss';

interface ITuoToastProps {
  content: string;
  className?: string;
  direction?: 'top' | 'bottom';
  width?: string;
  height?: string;
  distence? : number
  closeIcon? : JSX.Element;
}

const TuoToast = ({
  content,
  className,
  width = '300px',
  height = '41px',
}:ITuoToastProps) => {

  const toastRef = useRef<HTMLDivElement | null>(null);
  const [toastState, setToastState] = useState<'open' | 'stop' | 'close'>('open');

  const { hideToast } = useTuoToast();

  /* open, stop, close 각각 애니메이션이 끝나면 클래스 변경 */

  const handleToastClass = () => {
    const currentRef = toastRef.current

    if (currentRef?.classList.contains('open')) setToastState('stop');
    else if (currentRef?.classList.contains('stop')) setToastState('close');
    else hideToast();
  };

  useEffect(() => {
    let styleSheet = document.styleSheets[0];
    let animationName = `toast-${toastState}`;
    let keyframes = `@keyframes ${animationName} {
      0% { transform: translate(-50%, ${toastState === 'open' ? '100%' :  '-16px'}) }
      100% { transform: translate(-50%, ${toastState === 'close' ? '100%' : '-16px' }) }
    }`

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  },[toastState])

  useEffect(() => {
    const currentRef = toastRef.current

    currentRef?.addEventListener('animationend' , handleToastClass);
    
    return () => {
      currentRef?.removeEventListener('animationend' , handleToastClass);
    };
  }, []);
  
  useEffect(() => {
    setToastState('open');
  }, [content]);

 
  return (
    <div
      ref={toastRef}
      className={`toast-container ${className}`}
      style={{
        width: width,
        height: height,
        animationName: `toast-${toastState}`,
        animationDuration: `${toastState === 'stop' ? '2000ms' : '500ms'}`,
      }}
    >
      <div className="close-icon" onClick={() => setToastState('close')}>close</div>
      {<span>{content}</span>}
    </div>
  );
};

export default TuoToast;