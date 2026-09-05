import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqqqpnfbanjrhvgasjuq.supabase.co';
const supabaseKey = 'sb_publishable_Pslou1XLe6oqkKmAoU2OHw_bwIM9-qq';

export const supabase = createClient(supabaseUrl, supabaseKey);
