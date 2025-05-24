import { getAchievementDetail } from "@/app/(roles)/admin/achievements/libs/data";
import EditAchievementForm from "../../components/EditAchievementForm";

const page = async ({ params }) => {
  const id = params.id;

  const achievement = await getAchievementDetail(id);
  console.log(achievement);

  if (!achievement) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-xl font-bold text-red-600 mb-4">Achievement Tidak Ditemukan</h1>
          <p className="text-gray-600">Achievement dengan ID {id} tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return <EditAchievementForm achievement={achievement} />;
};

export default page;
