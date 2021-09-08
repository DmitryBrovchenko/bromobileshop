import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

const ADMIN_UID = 'sHHYGDL9ZWZWIG0VnmpHGo4VbCI3';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    admin: boolean;
    userName: string;

    constructor(private auth: AngularFireAuth) {
        auth.authState.subscribe((user) => {
            this.admin = user?.uid === ADMIN_UID;
            this.userName = user?.displayName ?? user?.email;
        });
    }

    getAuthState() {
        return this.auth.authState;
    }

    login(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    loginGuest() {
        return this.auth.signInAnonymously();
    }
}