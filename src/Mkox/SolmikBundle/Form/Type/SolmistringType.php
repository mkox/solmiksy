<?php

namespace Mkox\SolmikBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Mkox\SolmikBundle\Utils;

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
        $soundKeys =  Utils\Misc::getSoundKeys();
        foreach ($soundKeys as $value => $label) {
            $soundKeyOption = array();
            $soundKeyOption[$value] = $label;
            $soundKeyValueOptions[] = $soundKeyOption;
        }
        
        $baseScaleValueOptions = array();
        for ($i = 1; $i <= 9; $i++) {
            $baseScaleOption = array();
            $baseScaleOption[$i] = $i;
            $baseScaleValueOptions[] = $baseScaleOption;
        }
        
        // for the full reference of options defined by each form field type
        // see http://symfony.com/doc/current/reference/forms/types.html
        $builder
            ->add('name')
            ->add('soundKey', 'choice', array('choices' => $soundKeyValueOptions))
            ->add('baseScale', 'choice', array('choices' => $baseScaleValueOptions))
            ->add('string')
//            ->add('category', new CategoryType())
            ->add('categories', 'entity', array(
                'class' => 'MkoxSolmikBundle:User',
                'choices' => $solmistring->Categories(), 
                //$solmistring über $options übergeben?
            ))
            ->add('save', 'submit')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Mkox\SolmikBundle\Entity\Solmistring',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'solmik_solmistring';
    }
}
