
-- Create agents table
CREATE TABLE public.agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  specialization TEXT,
  experience_years INTEGER,
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer interactions table
CREATE TABLE public.customer_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  property_type TEXT,
  budget_range TEXT,
  location_preference TEXT,
  interaction_type TEXT NOT NULL, -- 'inquiry', 'viewing', 'offer', 'closed'
  interaction_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure agents can only see their own data
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for agents table
CREATE POLICY "Agents can view their own profile" 
  ON public.agents 
  FOR SELECT 
  USING (id = (current_setting('app.current_agent_id', true))::uuid);

CREATE POLICY "Agents can update their own profile" 
  ON public.agents 
  FOR UPDATE 
  USING (id = (current_setting('app.current_agent_id', true))::uuid);

-- Create policies for customer_interactions table
CREATE POLICY "Agents can view their own customer interactions" 
  ON public.customer_interactions 
  FOR SELECT 
  USING (agent_id = (current_setting('app.current_agent_id', true))::uuid);

CREATE POLICY "Agents can create customer interactions" 
  ON public.customer_interactions 
  FOR INSERT 
  WITH CHECK (agent_id = (current_setting('app.current_agent_id', true))::uuid);

CREATE POLICY "Agents can update their own customer interactions" 
  ON public.customer_interactions 
  FOR UPDATE 
  USING (agent_id = (current_setting('app.current_agent_id', true))::uuid);

CREATE POLICY "Agents can delete their own customer interactions" 
  ON public.customer_interactions 
  FOR DELETE 
  USING (agent_id = (current_setting('app.current_agent_id', true))::uuid);

-- Create index for better performance
CREATE INDEX idx_customer_interactions_agent_id ON public.customer_interactions(agent_id);
CREATE INDEX idx_customer_interactions_interaction_date ON public.customer_interactions(interaction_date DESC);
