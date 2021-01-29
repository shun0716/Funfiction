import * as React from "react";

export interface IKeys {
  article: string;
  paragraph1: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraph4?: string;
  paragraph5?: string;
  paragraph6?: string;
  paragraph7?: string;
  paragraph8?: string;
  paragraph9?: string;
  paragraph10?: string;
  paragraph11?: string;
  paragraph12?: string;
  paragraph13?: string;
  paragraph14?: string;
  paragraph15?: string;
  paragraph16?: string;
}

interface PolicyComponentIProps {
  explanation: string;
  terms: IKeys[];
}

const PolicyComponent: React.FC<PolicyComponentIProps> = ({ ...props }) => {
  return (
    <div className="terms_layout">
      <p className="terms_explanation">{props.explanation}</p>
      {props.terms.map((terms: IKeys, index: number) => (
        <section key={index} className="terms_box">
          <h2>{terms.article}</h2>
          <p>{terms.paragraph1}</p>
          <p>{terms.paragraph2}</p>
          <p>{terms.paragraph3}</p>
          <p>{terms.paragraph4}</p>
          <p>{terms.paragraph5}</p>
          <p>{terms.paragraph6}</p>
          <p>{terms.paragraph7}</p>
          <p>{terms.paragraph8}</p>
          <p>{terms.paragraph9}</p>
          <p>{terms.paragraph10}</p>
          <p>{terms.paragraph11}</p>
          <p>{terms.paragraph12}</p>
          <p>{terms.paragraph13}</p>
          <p>{terms.paragraph14}</p>
          <p>{terms.paragraph15}</p>
          <p>{terms.paragraph16}</p>
        </section>
      ))}
      <p className="fin">以上</p>
    </div>
  );
};

export default PolicyComponent;
