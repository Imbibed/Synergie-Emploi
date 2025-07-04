export class JobSeekerDto {
  id: number | undefined
  firstName: string | undefined
  lastName: string | undefined
  phoneNumber: string | undefined
  status: string | undefined
  gender: string | undefined

  constructor(id: number, firstName: string, lastName: string, phoneNumber: string, status: string, gender: string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.status = status
    this.gender = gender
  }
}
