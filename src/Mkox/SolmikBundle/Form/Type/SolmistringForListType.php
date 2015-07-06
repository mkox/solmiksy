<?php

namespace SolmikBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Defines the form used to create and manipulate solmistrings.
 */
class SolmistringType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $soundKeyValueOptions = array();
        $soundKeys =  Service\Misc::getSoundKeys();
        foreach ($soundKeys as $value => $label) {
            $soundKeyOption = array();
            $soundKeyOption['value'] = $value;
            $soundKeyOption['label'] = $label;
            $soundKeyValueOptions[] = $soundKeyOption;
        }
        
        $baseScaleValueOptions = array();
        for ($i = 1; $i <= 9; $i++) {
            $baseScaleOption = array();
            $baseScaleOption['value'] = $i;
            $baseScaleOption['label'] = $i;
            $baseScaleValueOptions[] = $baseScaleOption;
        }
        
        // for the full reference of options defined by each form field type
        // see http://symfony.com/doc/current/reference/forms/types.html
        $builder
            ->add('soundKey', 'choice', $soundKeyValueOptions)
            ->add('baseScale', 'choice', $baseScaleValueOptions)
            ->add('string')
            ->add('save', 'submit')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SolmikBundle\Entity\Solmistring',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'solmik_solmistring_for_list';
    }
}
