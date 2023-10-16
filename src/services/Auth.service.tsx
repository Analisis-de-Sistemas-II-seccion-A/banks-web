import { environment } from "../environments/environment";
import { User } from "../interfaces/User.interface";

export default class AuthService {

  static logout(): void {
    console.log('entrando al logut')
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.location.href = environment.erpUri;
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem("isAuthenticated") === "true";
  }

  static getUser(): User {
    return JSON.parse(localStorage.getItem("user") as string);
  }
}
