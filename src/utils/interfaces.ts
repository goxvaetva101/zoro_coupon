export interface Job {
    jobId: string;
    tasks: Task[];
    status: JobStatus;
}

export enum JobStatus {
    QUEUED = "QUEUED",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE",
}

export interface Task {
    task: number;
    payload?: any;
}

export interface Account {
    email: string;
    password: string;
    cardNumber?: string;
    expMonth?: string;
    expYear?: string;
    nameOnCard?: string;
    name?: string;
    company?: string;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
}

export interface Product {
    url: string;
}

export interface Coupon {
    coupon: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AddToCartPayload {
    url: string;
}

export interface CardPayload {
    cardNumber: string;
    expMonth: string;
    expYear: string;
    nameOnCard: string;
}

export interface BillingPayload {
    name: string;
    company?: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
}

export interface TryCouponsPayload {
    coupons: string[];
}
