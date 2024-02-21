// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      user: { id: number; email: string; country: string; language: string; isAuthenticated: boolean; };
      session: { id: number; };
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
