export function Container(props) {
  const ypadding = props.ypadding || "py-10";
  const xpadding = props.xpadding || "px-4 sm:px-6 lg:px-8";

  return (
    <div className={ypadding}>
      <div className={`${xpadding} ${props.className}`}>{props.children}</div>
    </div>
  );
}
