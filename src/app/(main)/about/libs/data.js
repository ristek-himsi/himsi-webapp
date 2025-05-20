import prisma from "@/lib/prisma";

/**
 * Fetches the active organization structure for the current academic year
 * with detailed information about each role holder
 * @returns {Promise<Object>} The organization structure with detailed user information
 */
export async function getCurrentOrganization() {
  try {
    // Get the current date to determine the current academic year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Find the active organization structure for the current academic year
    const organization = await prisma.organizationStructure.findFirst({
      where: {
        isActive: true,
        academicYear: currentYear,
      },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
            position: true,
            division: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        viceLeader: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
            position: true,
            division: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        secretary: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
            position: true,
            division: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        treasurer: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
            position: true,
            division: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // If no active organization is found for the current year, try to find the most recent one
    if (!organization) {
      const fallbackOrganization = await prisma.organizationStructure.findFirst({
        where: {
          isActive: true,
        },
        orderBy: {
          academicYear: "desc",
        },
        include: {
          leader: {
            select: {
              id: true,
              name: true,
              email: true,
              photo_url: true,
              position: true,
              division: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          viceLeader: {
            select: {
              id: true,
              name: true,
              email: true,
              photo_url: true,
              position: true,
              division: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          secretary: {
            select: {
              id: true,
              name: true,
              email: true,
              photo_url: true,
              position: true,
              division: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          treasurer: {
            select: {
              id: true,
              name: true,
              email: true,
              photo_url: true,
              position: true,
              division: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return fallbackOrganization;
    }

    return organization;
  } catch (error) {
    console.error("Error fetching current organization:", error);
    throw new Error("Failed to fetch organization structure");
  }
}
