import { DemoSchema } from "#/db/demo";

const DemoComponent = async () => {
  await DemoSchema.create({
    todo: 'HELLO WORLD Auto TODO'
  })
  const demoResults = await DemoSchema.find();
  return (
    <div>
      <pre>{JSON.stringify({ demoResults }, null, 2)}</pre>
    </div>
  );
};

export { DemoComponent };
