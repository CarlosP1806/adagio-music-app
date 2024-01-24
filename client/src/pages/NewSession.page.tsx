import AuthLayout from "../layouts/AuthLayout";

function NewSession() {
  return (
    <>
      <AuthLayout title="New Session">
        <div> New session</div>
        <div> Record</div>
      </AuthLayout>
    </>
  );
}

export const NewSessionRoute = {
  element: <NewSession />,
};
