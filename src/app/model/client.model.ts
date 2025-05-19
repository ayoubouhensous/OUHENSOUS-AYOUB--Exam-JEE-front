export interface Credit {
  id: number;
  statut: string;
  montant: number;
  tauxInteret: number;
  clientId: number;
  remboursements: Remboursement[];
  motif?: string | null;
  raisonSociale?: string | null;
  typeBien?: string | null;
}

export interface Remboursement {
  id: number;
  montant: number;
  type: string;
  creditId: number;
}

export interface Client {
  id: number;
  nom: string;
  email: string;
  credits: Credit[];
}
