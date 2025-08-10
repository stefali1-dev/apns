import { Member } from "@/lib/types/member";
import { supabase } from "@/lib/supabaseClient";

// services/membersService.ts
export class MembersService {
    private readonly tableName = 'members';

    // Map database columns (snake_case) to Member interface (camelCase)
    private mapDatabaseToMember(dbMember: any): Member {
        return {
            id: dbMember.id,
            name: dbMember.name,
            position: dbMember.position,
            secondaryPosition: dbMember.secondary_position,
            imageUrl: dbMember.image_url,
            description: dbMember.description,
            specializations: dbMember.specializations,
            education: dbMember.education,
            email: dbMember.email,
            phone: dbMember.phone,
            priority: dbMember.priority,
            imageWidth: dbMember.image_width,
            imageHeight: dbMember.image_height,
            imagePriority: dbMember.image_priority
        };
    }

    // Map Member interface (camelCase) to database columns (snake_case)
    private mapMemberToDatabase(member: Partial<Member>): any {
        const dbMember: any = {};
        if (member.id !== undefined) dbMember.id = member.id;
        if (member.name !== undefined) dbMember.name = member.name;
        if (member.position !== undefined) dbMember.position = member.position;
        if (member.secondaryPosition !== undefined) dbMember.secondary_position = member.secondaryPosition;
        if (member.imageUrl !== undefined) dbMember.image_url = member.imageUrl;
        if (member.description !== undefined) dbMember.description = member.description;
        if (member.specializations !== undefined) dbMember.specializations = member.specializations;
        if (member.education !== undefined) dbMember.education = member.education;
        if (member.email !== undefined) dbMember.email = member.email;
        if (member.phone !== undefined) dbMember.phone = member.phone;
        if (member.priority !== undefined) dbMember.priority = member.priority;
        if (member.imageWidth !== undefined) dbMember.image_width = member.imageWidth;
        if (member.imageHeight !== undefined) dbMember.image_height = member.imageHeight;
        if (member.imagePriority !== undefined) dbMember.image_priority = member.imagePriority;
        return dbMember;
    }

    async getMembers(): Promise<Member[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .order('priority', { ascending: true });

            if (error) {
                console.error('Error fetching members:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToMember(item));
        } catch (error) {
            console.error('Error in getMembers:', error);
            return [];
        }
    }

    async getMemberById(id: string): Promise<Member | null> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching member by id:', error);
                return null;
            }

            return data ? this.mapDatabaseToMember(data) : null;
        } catch (error) {
            console.error('Error in getMemberById:', error);
            return null;
        }
    }

    async getMembersByPosition(position: string): Promise<Member[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .ilike('position', `%${position}%`)
                .order('name');

            if (error) {
                console.error('Error fetching members by position:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToMember(item));
        } catch (error) {
            console.error('Error in getMembersByPosition:', error);
            return [];
        }
    }

    async searchMembers(query: string): Promise<Member[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .or(`name.ilike.%${query}%,position.ilike.%${query}%,specializations.cs.{${query}}`)
                .order('name');

            if (error) {
                console.error('Error searching members:', error);
                return [];
            }

            return (data || []).map(item => this.mapDatabaseToMember(item));
        } catch (error) {
            console.error('Error in searchMembers:', error);
            return [];
        }
    }

    // Admin methods for managing members
    async createMember(member: Omit<Member, 'id'>): Promise<Member | null> {
        try {
            const dbMember = this.mapMemberToDatabase(member);
            const { data, error } = await supabase
                .from(this.tableName)
                .insert([dbMember])
                .select()
                .single();

            if (error) {
                console.error('Error creating member:', error);
                return null;
            }

            return data ? this.mapDatabaseToMember(data) : null;
        } catch (error) {
            console.error('Error in createMember:', error);
            return null;
        }
    }

    async updateMember(id: string, updates: Partial<Member>): Promise<Member | null> {
        try {
            const dbUpdates = this.mapMemberToDatabase(updates);
            const { data, error } = await supabase
                .from(this.tableName)
                .update(dbUpdates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating member:', error);
                return null;
            }

            return data ? this.mapDatabaseToMember(data) : null;
        } catch (error) {
            console.error('Error in updateMember:', error);
            return null;
        }
    }

    async deleteMember(id: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from(this.tableName)
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting member:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in deleteMember:', error);
            return false;
        }
    }

    // Update member priorities for reordering
    async updateMemberPriorities(memberPriorities: { id: string, priority: number }[]): Promise<boolean> {
        try {
            // Update all member priorities in a transaction-like manner
            const updatePromises = memberPriorities.map(({ id, priority }) =>
                supabase
                    .from(this.tableName)
                    .update({ priority })
                    .eq('id', id)
            );

            const results = await Promise.all(updatePromises);
            
            // Check if any updates failed
            const hasError = results.some(result => result.error);
            if (hasError) {
                console.error('Error updating member priorities:', results.find(r => r.error)?.error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in updateMemberPriorities:', error);
            return false;
        }
    }

    // Get the next available priority for new members
    async getNextPriority(): Promise<number> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('priority')
                .order('priority', { ascending: false })
                .limit(1);

            if (error) {
                console.error('Error getting next priority:', error);
                return 1;
            }

            return data && data.length > 0 ? data[0].priority + 1 : 1;
        } catch (error) {
            console.error('Error in getNextPriority:', error);
            return 1;
        }
    }

    // Update just the image URL for a member
    async updateMemberImage(id: string, imageUrl: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from(this.tableName)
                .update({ image_url: imageUrl })
                .eq('id', id);

            if (error) {
                console.error('Error updating member image:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in updateMemberImage:', error);
            return false;
        }
    }
}

export const membersService = new MembersService();