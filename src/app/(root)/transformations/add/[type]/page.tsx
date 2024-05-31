import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function AddTransformationPage({
  params: { type },
}: SearchParamProps) {
  const { userId } = auth();

  const transformation = transformationTypes[type as TransformationTypeKey];

  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await getUserById(userId);

  if (!user) {
    return redirect("/sign-in");
  }

  if (!transformation) {
    return notFound();
  }

  return (
    <>
      <Header title={transformation.title} subTitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
}
