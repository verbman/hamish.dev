import React, { useState, useEffect } from 'react';
import { SvgLinkType } from '../lib/types';

export default function SvgLink({ props }: { props: SvgLinkType }) {

  const [svgColor, setSvgColor] = useState(props.colour);

  useEffect(() => {
    if (props.colour !== svgColor) {
      setSvgColor(props.colour);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.colour]);

  return (<a aria-label={props.label} target="_blank" href={props.link} rel="noreferrer" className={props.className}
    onMouseEnter={() => setSvgColor('')}
    onMouseLeave={() => setSvgColor(props.colour)}>
    <props.comp width={props.width} height={props.height} className="link-svg" color={svgColor} />{props.text}
  </a>
  );
}
