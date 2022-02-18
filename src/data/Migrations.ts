import { BaseDatabase } from "./BaseDatabase";
import { HashManager } from "../services/HashManeger";
import { UserDatabase } from "./UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { ROLES, User } from "../model/User";
import { ClassDatabase } from "./ClassDatabase";
import { DAY, TEACHER, YogaClass } from "../model/YogaClass";
import moment from "moment";

const userDatabase = new UserDatabase()
const classDataBase = new ClassDatabase()
const genId = new IdGenerator()
const hashManager = new HashManager()

export class Migrations extends BaseDatabase {

  public async start(): Promise<void> {
    try {
      await BaseDatabase.connection.raw(`
      CREATE TABLE IF NOT EXISTS ygm_users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM("student", "teacher", "visitor", "admin") NOT NULL,
        validation_code VARCHAR(255) 
      );
      
      CREATE TABLE IF NOT EXISTS ygm_plans (
        id VARCHAR(255) PRIMARY KEY,
        type ENUM("Mensal", "Trimestral", "Semestral","Avulsa","Gympass") NOT NULL,
        frequency ENUM("1X", "2X", "3X", "---") NOT NULL,
        plan_started date NOT NULL,
        plan_ends date NOT NULL,
        total_classes INT NOT NULL,
        avaliable_classes INT NOT NULL,
        status BOOLEAN NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES ygm_users(id)
      );
      
      CREATE TABLE IF NOT EXISTS ygm_classes (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          date DATE NOT NULL,
          day ENUM("Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado") NOT NULL,
          time VARCHAR(255) NOT NULL,
          teacher VARCHAR(255) NOT NULL,
          group_id VARCHAR(255) NOT NULL
        );
        
      CREATE TABLE IF NOT EXISTS ygm_checkins (
          verified BOOLEAN DEFAULT FALSE,
          class_id VARCHAR(255) NOT NULL,
          plan_id VARCHAR(255) NOT NULL,
          FOREIGN KEY (class_id) REFERENCES ygm_classes(id),
          FOREIGN KEY (plan_id) REFERENCES ygm_plans(id)
        );
      
   `)

      console.log("tables created")
    } catch (error) {
      console.log(error)
    }
  }

  public async createAuthorizedUsers(): Promise<void> {
    try {

      const passwordAdmin = "123456a"
      const idAdmin = genId.generateId()
      const hashPasswordAdmin: string = await hashManager.generateHash(passwordAdmin)
      const admin = new User(idAdmin, "admin", "admin@email.com", hashPasswordAdmin, ROLES.ADMIN)
      await userDatabase.createUser(admin)

      const passwordTeacher = "123456t"
      const idTeacher = genId.generateId()
      const hashPasswordTeacher: string = await hashManager.generateHash(passwordTeacher)
      const teacher = new User(idTeacher, "teacher", "teacher@email.com", hashPasswordTeacher, ROLES.TEACHER)
      await userDatabase.createUser(teacher)

      const passwordVisitor = "123456v"
      const idVisitor = genId.generateId()
      const hashPasswordVisitor: string = await hashManager.generateHash(passwordVisitor)
      const visitor = new User(idVisitor, "visitor", "visitor@email.com", hashPasswordVisitor, ROLES.VISITOR)
      await userDatabase.createUser(visitor)

      const passwordUser = "123456s"
      const idStudent = genId.generateId()
      const hashPasswordUser: string = await hashManager.generateHash(passwordUser)
      const student = new User(idStudent, "student", "student@email.com", hashPasswordUser, ROLES.STUDENT)
      const result = await userDatabase.createUser(student)

      console.log({
        message: "save these password!!!!!",
        users: [
          {
            email: "admin@email.com",
            password: passwordAdmin
          },
          {
            email: "teacher@email.com",
            password: passwordTeacher
          },
          {
            email: "visitor@email.com",
            password: passwordVisitor
          },
          {
            email: "student@email.com",
            password: passwordUser
          },

        ]

      })
    } catch (error) {
      console.log(error)
    }
  }

  public async populate(): Promise<void> {
    try {


      const weeks: number = 50
      const aWeekInMilliseconds: number = 604800000

      const name1 = "Hatha Yoga"
      const startingDate1 = "09-23-2021"
      const timestamp1 = new Date(startingDate1).getTime()
      const groupID1: string = genId.generateId()

      for (let w: number = 0; w < weeks; w++) {
        const id = genId.generateId()

        const classTimeStamp1: number = timestamp1 + aWeekInMilliseconds * w
        const newDate = new Date(classTimeStamp1)
        const classDate: any = moment(newDate).format("YYYY-MM-DD")  //acho que esta redundante, pois já vem do front certo

        const newClass = new YogaClass(id, name1, classDate, DAY.THU, "19:00", TEACHER.LOUIZE, groupID1)

        await classDataBase.createClass(newClass)
      }

      const name2 = "Hatha Yoga"
      const startingDate2 = "09-22-2021"
      const timestamp2 = new Date(startingDate2).getTime()
      const groupID2: string = genId.generateId()

      for (let w: number = 0; w < weeks; w++) {
        const id = genId.generateId()

        const classTimeStamp2: number = timestamp2 + aWeekInMilliseconds * w
        const newDate = new Date(classTimeStamp2)
        const classDate: any = moment(newDate).format("YYYY-MM-DD")

        const newClass = new YogaClass(id, name2, classDate, DAY.WED, "7:00", TEACHER.LOUIZE, groupID2)

        await classDataBase.createClass(newClass)
      }

      const name3 = "Vinyasa Flow"
      const startingDate3 = "09-20-2021"
      const timestamp3 = new Date(startingDate3).getTime()
      const groupID3: string = genId.generateId()

      for (let w: number = 0; w < weeks; w++) {
        const id = genId.generateId()

        const classTimeStamp3: number = timestamp3 + aWeekInMilliseconds * w
        const newDate = new Date(classTimeStamp3)
        const classDate: any = moment(newDate).format("YYYY-MM-DD")

        const newClass = new YogaClass(id, name3, classDate, DAY.MON, "18:30", TEACHER.LOUIZE, groupID3)

        await classDataBase.createClass(newClass)
      }

      const name4 = "Yoga Restaurativo"
      const startingDate4 = "09-25-2021"
      const timestamp4 = new Date(startingDate4).getTime()
      const groupID4: string = genId.generateId()

      for (let w: number = 0; w < weeks; w++) {
        const id = genId.generateId()

        const classTimeStamp4: number = timestamp4 + aWeekInMilliseconds * w
        const newDate = new Date(classTimeStamp4)
        const classDate: any = moment(newDate).format("YYYY-MM-DD")

        const newClass = new YogaClass(id, name4, classDate, DAY.MON, "9:00", TEACHER.RODRIGO, groupID4)

        await classDataBase.createClass(newClass)
      }

      console.log("classes created" )
    } catch (error) {
      console.log(error)
    }
  }
}

const migrations = new Migrations()

migrations.start()
migrations.createAuthorizedUsers()
migrations.populate().finally()

// encerrar processo