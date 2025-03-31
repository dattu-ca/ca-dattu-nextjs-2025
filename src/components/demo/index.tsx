import { DemoSchema } from "#/db/demo";

const DemoComponent = async () => {
  const demoResults = await DemoSchema.find();
  return (
    <div>
      <pre>{JSON.stringify({ demoResults }, null, 2)}</pre>
    </div>
  );
};

export { DemoComponent };
