const memo = memo(({ text }: { text: string }) => {
  useEffect(() => {
    console.log("MyComponent was updated");
  });

  return <div>{text}</div>;
});

const Playground = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyComponent text="hi" />
      <Button onClick={() => setCount((c) => c + 1)}>{count}</Button>
    </>
  );
};

export default Playground;
type MyComponentProps = { text: string; callback: () => void };

const MyComponent = memo(({ text, callback }: MyComponentProps) => {
  useEffect(() => {
    console.log("MyComponent was updated");
  });

  return <div onClick={callback}>{text}</div>;
});

const Playground = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyComponent text="hi" callback={() => { }} />
      <Button onClick={() => setCount((c) => c + 1)}>{count}</Button>
    </>
  );
};

export default memo;