import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"

const AsyncScrypt = promisify(scrypt)

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex')
    const buf = (await AsyncScrypt(password, salt, 64)) as Buffer

    return `${buf.toString('hex')}.${salt}`
  }

  static async compare(storedPass: string, userPass: string) {
    const [hash, salt] = storedPass.split(".")
    const buf = (await AsyncScrypt(userPass, salt, 64)) as Buffer

    return buf.toString('hex') === hash
  }
}
