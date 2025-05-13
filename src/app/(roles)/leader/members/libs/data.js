import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getDivisionByLeaderId() {
  try {
    const { user } = await getUser();

    const data = await prisma.division.findFirst({
      where: {
        leaderId: user.id,
      },
    });

    return data.id;
  } catch (error) {
    console.error("Error fetching division by leader ID:", error);
    return {
      error: true,
      message: error.message || "Failed to get division by leader ID",
      code: error.code,
    };
  }
}

export async function getMemberByDivisionId(id) {
  try {
    const members = await prisma.user.findMany({
      where: {
        divisionId: id,
      },
      include: {
        division: true,
      },
    });
    return members;
  } catch (error) {
    console.error("Error fetching members by division ID:", error);
    return {
      error: true,
      message: error.message || "Failed to get members by division ID",
      code: error.code,
    };
  }
}

export async function deleteMemberFromDivision(memberId) {
  try {
    await prisma.user.update({
      where: { id: memberId },
      data: { divisionId: null, position: null },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting member from division:", error);
    return {
      error: true,
      message: error.message || "Failed to delete member from division",
      code: error.code,
    };
  }
}

export async function updateMemberPosition(memberId, position) {
  try {
    await prisma.user.update({
      where: { id: memberId },
      data: { position },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating member position:", error);
    return {
      error: true,
      message: error.message || "Failed to update member position",
      code: error.code,
    };
  }
}
