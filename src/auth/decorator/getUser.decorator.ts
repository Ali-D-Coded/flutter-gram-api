/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


export const GetUser = createParamDecorator(
  async (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const prisma = new PrismaClient();
    const user = request.user;
    console.log(user.sub);
    // const userData = await prisma.customerAuth.findUnique({
    //   where: {
    //     id: Number(user.sub)
    //   },
    //   include: {
    //     customer: {
    //       include: {
    //         Booking_data: {
    //           select: {
    //             id: true,
    //             user: {
    //               select: {
    //                 id: true,
    //                 name: true,
    //                 phone: true
    //               }
    //             },
    //             timeSlot: {
    //               select: {
    //                 time:true
    //               }
    //             }

    //           }
    //         },
    //         prescription: {
    //           select: {
    //             id: true,
    //             createdAt: true,
    //             updatedAt: true,
    //             doctor: {
    //               select: {
    //                 id: true,
    //                 name: true
    //               }
    //             },
    //             doctor_comment: true,
    //             prescriptionImg: {
    //               select: {
    //                 id: true,
    //                 url: true
    //               }
    //             }
    //           }
    //         },
    //         profile_pic: {
    //           select: {
    //             id: true,
    //             url: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // })
    

    // return data ? user?.[data] : userData;
  },
);

export const GetHospital = createParamDecorator(
  async (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const prisma = new PrismaClient();
    const user = request.user;
    console.log(user.sub);
    // const userData = await prisma.hospitalAuth.findUnique({
    //   where: {
    //     id: Number(user.sub)
    //   },
    //   include: {
    //     hospital: {
    //       include: {
    //         departments: {
    //           select: {
    //             department: {
    //               include: {
    //                 image: true
    //               }
    //             }
    //           }
    //         },
    //         facilities: {
    //           select: {
    //             facility:true
    //           }
    //         },
    //         rooms: {
    //           select: {
    //             room:true
    //           }
    //         },
    //         doctors: {
    //           select: {
    //             doctor: {
    //               include: {
    //                 profile_pic: true,
    //                 doctor_appointments: true,
    //                 prescription: {
    //                   include: {
    //                     doctor:true,
    //                     user: true,
    //                     prescriptionImg:true
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   // include: {
    //   //   customer: {
    //   //     include: {
    //   //       Booking_data: true,
    //   //       prescription: true,
    //   //       profile_pic: true
    //   //     }
    //   //   }
    //   // }
    // })
    

    // return data ? user?.[data] : userData;
  },
);

export const GetDoctor = createParamDecorator(
  async (
    data: string | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx
      .switchToHttp()
      .getRequest();
    const prisma = new PrismaClient();
    const user = request.user;
    console.log(user.sub);
    // const userData =
    //   await prisma.doctorAuth.findUnique({
    //     where: {
    //       id: Number(user.sub),
    //     },
    //     include: {
    //       doctor: {
    //         include: {
    //           profile_pic: true,
    //           doctor_appointments: true,
    //           hospitals: true,
    //           prescription: true
    //        }
    //      }
    //     },
    //   });

    // return data ? user?.[data] : userData;
  },
);


