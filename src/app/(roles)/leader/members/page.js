export const dynamic = "force-dynamic";

import React from "react";
import { getDivisionByLeaderId, getMemberByDivisionId } from "./libs/data";
import { MemberCard } from "@/components/admin/MemberCard";
import Link from "next/link";
import { Users } from "lucide-react";

const Page = async () => {
  const divisionId = await getDivisionByLeaderId();
  const members = await getMemberByDivisionId(divisionId);
  // console.log(members);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Division Members</h1>
          {members && (
            <div className="flex items-center text-gray-600 mt-1">
              <Users className="w-4 h-4 mr-1" />
              <span>
                Total : {members.length} {members.length === 1 ? "Member" : "Members"}
              </span>
            </div>
          )}
        </div>
        <Link href="/leader/members/add">
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition-colors">Add New Member</button>
        </Link>
      </div>

      {/* Loading state */}
      {!members && (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      )}

      {/* Member cards */}
      {members && members.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {members && members.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500 mb-4">No members found in this division</div>
          <Link href="/leader/members/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition-colors">Add Your First Member</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
