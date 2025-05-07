"use server";

import prisma from "@/lib/prisma";

/**
 * Get all events with related data
 */
export async function getAllEvents() {
  try {
    const events = await prisma.event.findMany({
      include: {
        gallery: true,
        sifest: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return events;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw new Error("Failed to fetch events");
  }
}

/**
 * Get a single event by ID with all related data
 */
export async function getEventById(id) {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      include: {
        gallery: true,
        sifest: true,
      },
    });

    return event;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw new Error("Failed to fetch event");
  }
}

/**
 * Create a new event
 */
export async function createEvent(eventData) {
  try {
    const newEvent = await prisma.event.create({
      data: eventData,
    });

    return newEvent;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

/**
 * Update an existing event
 */
export async function updateEvent(id, eventData) {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: eventData,
    });

    return updatedEvent;
  } catch (error) {
    console.error(`Error updating event with ID ${id}:`, error);
    throw new Error("Failed to update event");
  }
}

/**
 * Delete an event
 */
export async function deleteEvent(id) {
  try {
    const deletedEvent = await prisma.event.delete({
      where: { id },
    });

    return deletedEvent;
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw new Error("Failed to delete event");
  }
}

/**
 * Get events by type (REGULAR or SIFEST)
 */
export async function getEventsByType(type) {
  try {
    const events = await prisma.event.findMany({
      where: {
        type: type,
      },
      include: {
        gallery: true,
        sifest:
          type === "SIFEST"
            ? {
                include: {
                  activities: true,
                },
              }
            : false,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return events;
  } catch (error) {
    console.error(`Error fetching events of type ${type}:`, error);
    throw new Error(`Failed to fetch ${type} events`);
  }
}

/**
 * Get events by status (UPCOMING, ONGOING, COMPLETED)
 */
export async function getEventsByStatus(status) {
  try {
    const events = await prisma.event.findMany({
      where: {
        status: status,
      },
      include: {
        gallery: true,
        sifest: true,
      },
      orderBy: {
        startDate: status === "UPCOMING" ? "asc" : "desc",
      },
    });

    return events;
  } catch (error) {
    console.error(`Error fetching events with status ${status}:`, error);
    throw new Error(`Failed to fetch ${status} events`);
  }
}

/**
 * Get events for a specific academic year
 */
export async function getEventsByAcademicYear(academicYear) {
  try {
    const events = await prisma.event.findMany({
      where: {
        academicYear: academicYear,
      },
      include: {
        gallery: true,
        sifest: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return events;
  } catch (error) {
    console.error(`Error fetching events for academic year ${academicYear}:`, error);
    throw new Error(`Failed to fetch events for academic year ${academicYear}`);
  }
}

/**
 * Get all SIFest events with activities
 */
export async function getAllSifestEvents() {
  try {
    const sifests = await prisma.sIFest.findMany({
      include: {
        events: {
          include: {
            gallery: true,
          },
        },
        activities: true,
      },
      orderBy: {
        year: "desc",
      },
    });

    return sifests;
  } catch (error) {
    console.error("Error fetching all SIFest events:", error);
    throw new Error("Failed to fetch SIFest events");
  }
}

/**
 * Get a specific SIFest by year with all related data
 */
export async function getSifestByYear(year) {
  try {
    const sifest = await prisma.sIFest.findFirst({
      where: {
        year: year,
      },
      include: {
        events: {
          include: {
            gallery: true,
          },
        },
        activities: true,
      },
    });

    return sifest;
  } catch (error) {
    console.error(`Error fetching SIFest for year ${year}:`, error);
    throw new Error(`Failed to fetch SIFest for year ${year}`);
  }
}

/**
 * Get event gallery images with pagination
 */
export async function getEventGallery(eventId, page = 1, pageSize = 12) {
  try {
    const skip = (page - 1) * pageSize;

    const [gallery, totalCount] = await Promise.all([
      prisma.eventGallery.findMany({
        where: {
          eventId: eventId,
        },
        orderBy: {
          uploadedAt: "desc",
        },
        skip,
        take: pageSize,
      }),
      prisma.eventGallery.count({
        where: {
          eventId: eventId,
        },
      }),
    ]);

    return {
      gallery,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    };
  } catch (error) {
    console.error(`Error fetching gallery for event ${eventId}:`, error);
    throw new Error("Failed to fetch event gallery");
  }
}

/**
 * Search events by name or description
 */
export async function searchEvents(searchTerm) {
  try {
    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        gallery: true,
        sifest: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return events;
  } catch (error) {
    console.error(`Error searching events with term "${searchTerm}":`, error);
    throw new Error("Failed to search events");
  }
}

/**
 * Get latest events (limited to a specific count)
 */
export async function getLatestEvents(limit = 5) {
  try {
    const events = await prisma.event.findMany({
      take: limit,
      orderBy: {
        startDate: "desc",
      },
      include: {
        gallery: {
          take: 1,
        },
        sifest: true,
      },
    });

    return events;
  } catch (error) {
    console.error(`Error fetching latest ${limit} events:`, error);
    throw new Error("Failed to fetch latest events");
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit) {
  try {
    const today = new Date();

    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: today,
        },
      },
      orderBy: {
        startDate: "asc",
      },
      take: limit,
      include: {
        gallery: {
          take: 1,
        },
        sifest: true,
      },
    });

    return events;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    throw new Error("Failed to fetch upcoming events");
  }
}

/**
 * Get ongoing events
 */
export async function getOngoingEvents() {
  try {
    const today = new Date();

    const events = await prisma.event.findMany({
      where: {
        startDate: {
          lte: today,
        },
        endDate: {
          gte: today,
        },
      },
      include: {
        gallery: true,
        sifest: true,
      },
      orderBy: {
        endDate: "asc",
      },
    });

    return events;
  } catch (error) {
    console.error("Error fetching ongoing events:", error);
    throw new Error("Failed to fetch ongoing events");
  }
}

/**
 * Add gallery images to an event
 */
export async function addEventGalleryImages(eventId, images) {
  try {
    const now = new Date();

    const galleryItems = await prisma.eventGallery.createMany({
      data: images.map((image) => ({
        eventId,
        imageUrl: image.imageUrl,
        caption: image.caption,
        uploadedAt: now,
      })),
    });

    return galleryItems;
  } catch (error) {
    console.error(`Error adding gallery images to event ${eventId}:`, error);
    throw new Error("Failed to add gallery images");
  }
}

/**
 * Delete a gallery image
 */
export async function deleteGalleryImage(imageId) {
  try {
    const deletedImage = await prisma.eventGallery.delete({
      where: { id: imageId },
    });

    return deletedImage;
  } catch (error) {
    console.error(`Error deleting gallery image with ID ${imageId}:`, error);
    throw new Error("Failed to delete gallery image");
  }
}
