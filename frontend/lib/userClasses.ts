// User
export class User {
    constructor(
        public id: string,
        public name: string,
        public role: string
    ) { }
    getDashboardLink(): string {
        return "/"
    }
}
// Seller
export class Seller extends User {
    constructor(
        id: string, name: string
    ) {
        super(id, name, "SELLER");
    }
    override getDashboardLink(): string {
        return "/seller";
    }
}

//Super Admin
export class SuperAdmin extends User {
    constructor(id: string, name: string) {
        super(id, name, "SUPERADMIN");
    }
    override getDashboardLink(): string {
        return "/admin";
    }
}